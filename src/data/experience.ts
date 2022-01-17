export interface IExperience {
  location?: string;
  title: string;
  company: string;
  year: string;
  descriptionA: string;
  descriptionB: string;
  link: string;
  descriptionC?: string;
}

export const experienceData: IExperience[] = [
  {
    title: 'Coding Instructor and Mentor',
    company: 'Hyperion Development',
    year: '2019 April - 2020 May',
    link: 'https://hyperiondev.com',
    descriptionA:
      'Facilitated, organized and assisted students with their progression of the Web Development and Software Engineering Bootcamps.',
    descriptionB:
      'Assisted with the delivery of in-person lectures for Web Development students for our onsite Bootcamp when we did not have a Web Dev Lecturer for our onsite Bootcamp.'
  },
  {
    title: 'Software Developer',
    company: 'Symbionix',
    year: '2020 May - 2021 Sept',
    link: 'https://symbionix.co',
    descriptionA:
      'Developed Full-stack Applications that ranged from different industries like events, vehicle licensing, logistics and finance.',
    descriptionB:
      'Converted designs to sleek, functional and responsive web pages employing the use of concise stylesheets and semantic markup whilst gaining a good understanding of how to prototype/build full stack applications using JS.'
  },
  {
    title: 'Software Developer',
    company: 'Enlabeler',
    year: '2021 Nov - Current',
    link: 'https://enlabeler.com',
    descriptionA:
      'Currently developing features on top of a open source tool called CVAT that Enlabeler uses to annotate images and videos.',
    descriptionB:
      'Currently assisting an existing client to develop front end pages due to missing in-house skills when it comes to React JS.'
  },
  {
    title: 'Student',
    company: 'University of South Africa',
    year: '2021 - 2024',
    link: 'https://www.unisa.ac.za/sites/myunisa/default/',
    descriptionA:
      'Majoring in BSC Computing with focus in Software and Information Systems.',
    descriptionB:
      'Completed 1st year modules in Software Development, Web Development, Database Management and Information Systems.',
    descriptionC: 'Planning on resuming with 2nd year in 2022'
  }
];
