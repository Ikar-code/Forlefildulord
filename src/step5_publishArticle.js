import { supabase } from './clients.js';
import { log } from './logger.js';

const SEUIL_PUBLICATION = 7;

export async function publishArticle(article, evaluation, sujetTitre) {
  const statut = evaluation.score >= SEUIL_PUBLICATION ? 'published' : 'rejected';

  const { error } = await supabase.from('articles').insert({
    titre: article.titre,
    contenu: article.contenu,
    angle: article.angle,
    score: evaluation.score,
    statut: statut
  });

  if (error) {
    await log('publishArticle', 'Erreur insertion article: ' + error.message, 'error');
    throw error;
  }

  // Met à jour le statut du sujet correspondant
  await supabase
    .from('sujets')
    .update({ statut: 'traite' })
    .eq('titre', sujetTitre);

  await log('publishArticle', `Article "${article.titre}" enregistré avec statut "${statut}" (score: ${evaluation.score})`, 'success');
  return statut;
}
