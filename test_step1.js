const { findTopics } = require('./src/step1_findTopics');

(async () => {
  try {
    const topics = await findTopics();
    console.log('--- SUJETS TROUVÉS ---');
    console.log(JSON.stringify(topics, null, 2));
  } catch (e) {
    console.error('Échec:', e.message);
  }
})();
