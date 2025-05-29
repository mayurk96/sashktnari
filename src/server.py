from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

app = Flask(__name__)
CORS(app)

# Load datasets
def load_datasets():
    try:
        # Get the current directory where server.py is located
        current_dir = os.path.dirname(os.path.abspath(__file__))
        base_path = os.path.join(current_dir, 'datasets', 'jobs')
        print(f"Looking for datasets in: {base_path}")
        
        # Read CSV files
        jobs_df = pd.read_csv(os.path.join(base_path, 'jobs.csv'))
        skills_df = pd.read_csv(os.path.join(base_path, 'job_skills_new.csv'))
        industries_df = pd.read_csv(os.path.join(base_path, 'job_industries_new.csv'))
        benefits_df = pd.read_csv(os.path.join(base_path, 'benefits_new.csv'))
        
        print("Successfully loaded all datasets")
        
        # Convert job_id to string in all dataframes to avoid type mismatches
        jobs_df['job_id'] = jobs_df['job_id'].astype(str)
        skills_df['job_id'] = skills_df['job_id'].astype(str)
        industries_df['job_id'] = industries_df['job_id'].astype(str)
        benefits_df['job_id'] = benefits_df['job_id'].astype(str)
        
        # Convert boolean values
        jobs_df['remote'] = jobs_df['remote'].map({'true': True, 'false': False})
        
        return jobs_df, skills_df, industries_df, benefits_df
    except Exception as e:
        print(f"Error loading datasets: {str(e)}")
        print(f"Current working directory: {os.getcwd()}")
        print(f"Files in current directory: {os.listdir('.')}")
        print(f"Files in datasets directory: {os.listdir(os.path.join(current_dir, 'datasets'))} if os.path.exists(os.path.join(current_dir, 'datasets')) else 'datasets directory not found'")
        return None, None, None, None

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        print("Received request data:", data)
        
        # Load datasets
        jobs_df, skills_df, industries_df, benefits_df = load_datasets()
        if jobs_df is None:
            return jsonify({
                'status': 'error',
                'message': 'Failed to load datasets'
            }), 500

        # Process user preferences
        user_skills = [skill.strip().upper() for skill in data.get('skills', '').split(',') if skill.strip()]
        user_industries = [ind.strip().lower() for ind in data.get('preferredIndustries', '').split(',') if ind.strip()]
        desired_roles = [role.strip().lower() for role in data.get('desiredRoles', '').split(',') if role.strip()]
        work_type = data.get('workType', '').lower()
        location = data.get('preferredLocation', '').lower()
        remote_only = data.get('remoteWork', False)

        # Filter jobs based on preferences
        filtered_jobs = jobs_df.copy()
        
        # Filter by desired roles if provided
        if desired_roles:
            role_filter = filtered_jobs['title'].str.lower().apply(lambda x: any(role in x for role in desired_roles))
            if role_filter.any():
                filtered_jobs = filtered_jobs[role_filter]
        
        # Make work type matching more flexible
        if work_type:
            work_type_filter = filtered_jobs['work_type'].str.lower() == work_type
            if work_type_filter.any():
                filtered_jobs = filtered_jobs[work_type_filter]
        
        # Make location matching more flexible
        if location:
            location_filter = (
                filtered_jobs['location'].str.lower().str.contains(location, na=False) |
                (remote_only & filtered_jobs['remote'])
            )
            if location_filter.any():
                filtered_jobs = filtered_jobs[location_filter]
        
        # If remote work is required, include all remote jobs regardless of location
        if remote_only:
            remote_filter = filtered_jobs['remote'] == True
            if remote_filter.any():
                filtered_jobs = filtered_jobs[remote_filter]

        # Get skills for each job
        job_skills = skills_df.groupby('job_id')['skill_abr'].apply(lambda x: ' '.join(x)).reset_index()
        job_skills = job_skills.merge(filtered_jobs, on='job_id', how='inner')

        # Get industries for each job
        job_industries = industries_df.groupby('job_id')['industry_id'].apply(lambda x: ' '.join(x)).reset_index()
        job_industries = job_industries.merge(filtered_jobs[['job_id']], on='job_id', how='inner')

        # Get benefits for each job
        job_benefits = benefits_df.groupby('job_id')['type'].apply(lambda x: ' '.join(x)).reset_index()
        job_benefits = job_benefits.merge(filtered_jobs[['job_id']], on='job_id', how='inner')

        if len(job_skills) == 0:
            # If no matches found, return all jobs sorted by skill match
            job_skills = skills_df.groupby('job_id')['skill_abr'].apply(lambda x: ' '.join(x)).reset_index()
            job_skills = job_skills.merge(jobs_df, on='job_id', how='inner')

        # Calculate match scores
        recommendations = []
        
        if len(user_skills) == 0 and len(user_industries) == 0:
            # If no skills or industries provided, return random recommendations
            sample_jobs = job_skills.sample(min(5, len(job_skills)))
            for _, job in sample_jobs.iterrows():
                job_industries_str = job_industries[job_industries['job_id'] == job['job_id']]['industry_id'].iloc[0] if len(job_industries) > 0 else ''
                job_benefits_str = job_benefits[job_benefits['job_id'] == job['job_id']]['type'].iloc[0] if len(job_benefits) > 0 else ''
                
                recommendations.append({
                    'id': job['job_id'],
                    'title': job['title'],
                    'company': job['company_name'],
                    'location': job['location'],
                    'work_type': job['work_type'],
                    'remote': bool(job['remote']),
                    'description': job['description'],
                    'salary_range': job['salary_range'],
                    'skills': job['skill_abr'].split(),
                    'industries': job_industries_str.split(),
                    'benefits': job_benefits_str.split(),
                    'match_score': 0.0
                })
        else:
            # Calculate skill match scores
            if len(user_skills) > 0:
                vectorizer = TfidfVectorizer()
                skill_vectors = vectorizer.fit_transform(job_skills['skill_abr'])
                user_skills_text = ' '.join(user_skills)
                user_vector = vectorizer.transform([user_skills_text])
                skill_similarities = cosine_similarity(user_vector, skill_vectors).flatten()
            else:
                skill_similarities = np.zeros(len(job_skills))

            # Calculate industry match scores
            if len(user_industries) > 0:
                industry_vectorizer = TfidfVectorizer()
                industry_vectors = industry_vectorizer.fit_transform(job_industries['industry_id'])
                user_industries_text = ' '.join(user_industries)
                user_industry_vector = industry_vectorizer.transform([user_industries_text])
                industry_similarities = cosine_similarity(user_industry_vector, industry_vectors).flatten()
            else:
                industry_similarities = np.zeros(len(job_skills))

            # Combine skill and industry scores
            combined_scores = (skill_similarities + industry_similarities) / 2 if len(user_skills) > 0 and len(user_industries) > 0 else (skill_similarities if len(user_skills) > 0 else industry_similarities)
            
            # Get top 5 recommendations
            top_indices = combined_scores.argsort()[-5:][::-1]
            
            for idx in top_indices:
                job = job_skills.iloc[idx]
                job_industries_str = job_industries[job_industries['job_id'] == job['job_id']]['industry_id'].iloc[0] if len(job_industries) > 0 else ''
                job_benefits_str = job_benefits[job_benefits['job_id'] == job['job_id']]['type'].iloc[0] if len(job_benefits) > 0 else ''
                
                recommendations.append({
                    'id': job['job_id'],
                    'title': job['title'],
                    'company': job['company_name'],
                    'location': job['location'],
                    'work_type': job['work_type'],
                    'remote': bool(job['remote']),
                    'description': job['description'],
                    'salary_range': job['salary_range'],
                    'skills': job['skill_abr'].split(),
                    'industries': job_industries_str.split(),
                    'benefits': job_benefits_str.split(),
                    'match_score': float(combined_scores[idx])
                })

        return jsonify({
            'status': 'success',
            'message': 'Recommendations generated successfully',
            'recommendations': recommendations
        })

    except Exception as e:
        print(f"Error in get_recommendations: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
