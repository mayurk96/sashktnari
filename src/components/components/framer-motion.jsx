import { motion } from 'framer-motion';

const ExampleComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1>Welcome to Sashakt Nari</h1>
    </motion.div>
  );
};

export default ExampleComponent;
