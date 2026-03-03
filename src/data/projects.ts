import { Project } from '../types/Project';

const topics = [
  "Water Monitoring", "Crop Disease", "Smart Classroom", "Waste Segregation", "Women Safety", 
  "Telemedicine", "Traffic Management", "Air Quality", "Renewable Energy", "Disaster Relief",
  "Elderly Care", "Smart Parking", "E-Governance", "Public Transport", "Cyber Security",
  "Smart Lighting", "Noise Pollution", "Flood Detection", "Pothole Mapping", "Smart Grid",
  "Wildlife Protection", "Forest Fire Alert", "Smart Irrigation", "Urban Farming", "Mental Health",
  "Blood Bank Sync", "Vaccine Tracker", "Smart Sanitation", "Heritage Preservation", "Digital Literacy"
];

export const projects: Project[] = Array.from({ length: 30 }, (_, i) => {
  const id = (i + 1).toString();
  const teamId = `T-${101 + i}`;
  const topic = topics[i];
  
  const districts = ["Bangalore", "Mysore", "Hubli", "Dharwad", "Belgaum", "Gulbarga", "Mangalore", "Shimoga"];
  const categories = ["Sustainability", "HealthTech", "EduTech", "Smart City", "Agriculture", "Safety"];

  return {
    id,
    teamId,
    title: `${topic} System`,
    tagline: `Innovative solution for ${topic.toLowerCase()}`,
    shortDescription: `A cutting-edge approach to solve challenges related to ${topic.toLowerCase()} using modern technology.`,
    fullDescription: `The ${topic} System is a comprehensive solution designed to address critical challenges in our society. By leveraging advanced technologies such as IoT, AI, and cloud computing, this project offers a scalable and efficient way to manage ${topic.toLowerCase()}. The system continuously monitors relevant parameters, analyzes data in real-time, and provides actionable insights to stakeholders. This proactive approach not only optimizes resource utilization but also significantly improves public welfare and safety. The user-friendly interface empowers citizens and administrators alike to interact with the system seamlessly. This project demonstrates a cost-effective method to modernize infrastructure and promote sustainable development across the state.`,
    summary: `Uses IoT and AI to manage ${topic.toLowerCase()}. Provides real-time data analysis and actionable insights. Improves resource utilization and public welfare. Scalable and cost-effective.`,
    groupImageURL: `https://picsum.photos/seed/team${i}/1200/600`,
    videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    demoLink: `https://example.com/demo/${id}`,
    district: districts[i % districts.length],
    category: categories[i % categories.length]
  };
});
