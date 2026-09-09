import { FeaturedProject } from '../types';

export function isSkillMatchingProject(project: FeaturedProject, skill: string | null): boolean {
  if (!skill) return false;
  const s = skill.toLowerCase().trim();

  const allProjectText = [
    project.title,
    project.subtitle || '',
    project.description,
    ...(project.tags || []),
    ...(project.links?.map((l) => `${l.label} ${l.description || ''} ${l.url}`) || []),
    ...(project.keyFindings?.map((k) => `${k.label} ${k.value} ${k.subtext || ''}`) || []),
  ]
    .join(' ')
    .toLowerCase();

  // Python & libraries
  if (
    s.includes('python') ||
    s.includes('pandas') ||
    s.includes('numpy') ||
    s.includes('scikit-learn') ||
    s.includes('matplotlib') ||
    s.includes('seaborn') ||
    s.includes('plotly')
  ) {
    return (
      allProjectText.includes('python') ||
      project.tags.some((t) => t.toLowerCase().includes('python'))
    );
  }

  // SQL & relational query systems
  if (s === 'sql' || s.startsWith('sql')) {
    return (
      allProjectText.includes('sql') ||
      allProjectText.includes('bigquery') ||
      allProjectText.includes('dbt') ||
      project.tags.some(
        (t) =>
          t.toLowerCase().includes('sql') ||
          t.toLowerCase().includes('bigquery') ||
          t.toLowerCase().includes('dbt')
      )
    );
  }

  // BigQuery
  if (s.includes('bigquery')) {
    return (
      allProjectText.includes('bigquery') ||
      project.tags.some((t) => t.toLowerCase().includes('bigquery'))
    );
  }

  // dbt
  if (s.includes('dbt')) {
    return (
      allProjectText.includes('dbt') ||
      project.tags.some((t) => t.toLowerCase().includes('dbt'))
    );
  }

  // Fivetran
  if (s.includes('fivetran')) {
    return (
      allProjectText.includes('fivetran') ||
      project.tags.some((t) => t.toLowerCase().includes('fivetran'))
    );
  }

  // Git / GitHub
  if (s.includes('git')) {
    return (
      allProjectText.includes('git') ||
      allProjectText.includes('github') ||
      Boolean(project.links?.some((l) => l.type === 'github' || l.url.includes('github.com')))
    );
  }

  // Power BI / DAX
  if (s.includes('power bi') || s.includes('dax')) {
    return allProjectText.includes('power bi') || allProjectText.includes('dax');
  }

  // Looker Studio
  if (s.includes('looker')) {
    return (
      allProjectText.includes('looker') ||
      Boolean(
        project.links?.some(
          (l) =>
            l.label.toLowerCase().includes('looker') ||
            l.url.includes('datastudio.google.com')
        )
      )
    );
  }

  // Hypothesis Testing / Statistical Testing
  if (s.includes('hypothesis') || s.includes('statistical')) {
    return (
      allProjectText.includes('hypothes') ||
      allProjectText.includes('statistical') ||
      allProjectText.includes('mann-whitney') ||
      allProjectText.includes('p < 0.001') ||
      project.tags.some(
        (t) =>
          t.toLowerCase().includes('statistical') ||
          t.toLowerCase().includes('testing') ||
          t.toLowerCase().includes('hypothesis')
      )
    );
  }

  // Regression Modeling
  if (s.includes('regression')) {
    return (
      allProjectText.includes('regression') ||
      allProjectText.includes('predictive') ||
      project.tags.some(
        (t) =>
          t.toLowerCase().includes('regression') ||
          t.toLowerCase().includes('predictive')
      )
    );
  }

  // Clustering
  if (s.includes('cluster')) {
    return (
      allProjectText.includes('cluster') ||
      project.tags.some((t) => t.toLowerCase().includes('cluster'))
    );
  }

  // Classification
  if (s.includes('classif')) {
    return (
      allProjectText.includes('classif') ||
      project.tags.some((t) => t.toLowerCase().includes('classif'))
    );
  }

  // Fallback direct match
  return (
    allProjectText.includes(s) ||
    project.tags.some((t) => t.toLowerCase().includes(s))
  );
}

export function isTagMatchingSkill(tag: string, skill: string | null): boolean {
  if (!skill) return false;
  const t = tag.toLowerCase().trim();
  const s = skill.toLowerCase().trim();

  if (s.includes('python') && t.includes('python')) return true;
  if (s === 'sql' && (t === 'sql' || t.includes('bigquery') || t.includes('dbt'))) return true;
  if (s.includes('bigquery') && t.includes('bigquery')) return true;
  if (s.includes('dbt') && t.includes('dbt')) return true;
  if (s.includes('regression') && (t.includes('regression') || t.includes('predictive'))) return true;
  if (
    s.includes('hypothesis') &&
    (t.includes('statistical') || t.includes('testing') || t.includes('hypothesis'))
  ) {
    return true;
  }
  if (s.includes('survival') && t.includes('survival')) return true;
  if (s.includes('cluster') && t.includes('cluster')) return true;
  if (s.includes('classif') && t.includes('classif')) return true;

  return t.includes(s) || s.includes(t);
}
