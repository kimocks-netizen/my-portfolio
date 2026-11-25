import type { SkillGroup } from '@/types'

export const skills: SkillGroup[] = [
  { group: 'Frontend', items: ['React.js', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Shadcn/ui', 'Material UI', 'HTML', 'CSS'] },
  { group: 'Backend', items: ['Node.js', 'Python', 'Django', 'Express.js', 'Spring Boot', 'ASP.NET', 'REST APIs', 'WebSockets'] },
  { group: 'Cloud & AWS', items: ['AWS Lambda', 'API Gateway', 'ECS Fargate', 'DynamoDB', 'S3', 'RDS', 'CloudWatch', 'AWS IoT Core', 'IAM', 'Terraform', 'AWS Bedrock', 'SAM'] },
  { group: 'AI & ML', items: ['Amazon Bedrock', 'Google Gemini', 'Tesseract OCR', 'Document Processing', 'KYC Automation', 'NLP'] },
  { group: 'Databases', items: ['PostgreSQL', 'MySQL', 'DynamoDB', 'Supabase', 'Elasticsearch', 'Redis'] },
  { group: 'DevOps & Tools', items: ['Docker', 'Git', 'CI/CD', 'Bamboo', 'Jira', 'JMeter', 'Bitbucket', 'GitLab', 'Linux'] },
  { group: 'Security', items: ['JWT', 'RBAC', 'HTTP-only Cookies', 'OWASP Top 10', 'PCI-DSS', 'TLS/SSL', 'SEON', 'FraudDeflect'] },
  { group: 'Real-Time & Messaging', items: ['WebSockets', 'MQTT', 'Twilio', 'WebRTC', 'Apache ActiveMQ', 'Redis Pub/Sub'] },
]
