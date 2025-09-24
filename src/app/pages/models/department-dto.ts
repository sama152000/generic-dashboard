export interface Department {
  id: string;
  name: string;
  shortName: string;
  overview: string;
  type: string;
  image: string;
  contact: Contact;
}

export interface Contact {
  email: string; 
  phone?: string; 
  office: string; 
  headOfDepartment: string;
}

export interface Program {
  id: string;
  name: string; 
  description: string;
  duration: string; 
  degree: string;
}

export interface Faculty {
  id: string;
  name: string; 
  title: string; 
  specialization: string; 
  email: string; 
  photo?: string; 
}

export interface Activity {
  id: string;
  title: string; 
  description: string; 
  date: string; 
  image?: string; 
}