const data = {
  courses: [
    {
      slug: 'research-and-development',
      Course_name: 'Research and Development',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Libbey McCreery',
      Institution_name: 'University of Music and Fine Arts',
      enroll_students: 609,
      price: 13,
      thumbnail: 'http://placeimg.com/300/200/arch',
      rating: 4,
      numReviews: 10,
    },
    {
      slug: 'support-and-maintenance',
      Course_name: 'Support & Maintenance',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Mike Serris',
      Institution_name: 'Nanjing University of Technology',
      enroll_students: 101,
      price: 17,
      thumbnail: 'http://placeimg.com/300/200/tech',
      rating: 2.5,
      numReviews: 11,
    },
    {
      slug: 'sales-and-marketing',
      Course_name: 'Sales & Marketing',
      course_instructor: 'Mona Stripp',
      Institution_name: 'Atilim University',
      enroll_students: 134,
      price: 94,
      thumbnail: 'http://placeimg.com/300/200/people',
      rating: 4.5,
      numReviews: 11,
    },
    {
      slug: 'legal-counseling',
      Course_name: 'Legal Counseling',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Ken Gillam',
      Institution_name: 'Avondale College',
      enroll_students: 656,
      price: 74,
      thumbnail: 'http://placeimg.com/300/200/tech',
      rating: 3.5,
      numReviews: 20,
    },
    {
      slug: 'graphics-design',
      Course_name: 'Graphics Design',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Malvina Glason',
      Institution_name: 'Art Center College of Design',
      enroll_students: 215,
      price: 34,
      thumbnail: 'http://placeimg.com/300/200/nature',
      rating: 4.5,
      numReviews: 11,
    },
    {
      slug: 'accounting',
      Course_name: 'Accounting',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Idalia Alldridge',
      Institution_name: 'Technical University of Denmark',
      enroll_students: 333,
      price: 67,
      thumbnail: 'http://placeimg.com/300/200/arch',
      rating: 4,
      numReviews: 15,
    },
    {
      slug: 'web-development',
      Course_name: 'Web Development',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Tiebout Fysh',
      Institution_name: 'Belarusian-Russian University',
      enroll_students: 526,
      price: 92,
      thumbnail: 'http://placeimg.com/300/200/tech',
      rating: 3,
      numReviews: 10,
    },
    {
      slug: 'islamic-studies',
      Course_name: 'Islamic Studies',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Codi Karadzas',
      Institution_name: 'Islamic Azad University',
      enroll_students: 334,
      price: 26,
      thumbnail: 'http://placeimg.com/300/200/nature',
      rating: 5,
      numReviews: 10,
    },
    {
      slug: 'business-management',
      Course_name: 'Business Management',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Camila Blackeby',
      Institution_name: 'Omdurman Islamic University',
      enroll_students: 834,
      price: 28,
      thumbnail: 'http://placeimg.com/300/200/arch',
      rating: 2,
      numReviews: 10,
    },
    {
      slug: 'data-mining',
      Course_name: 'Data Mining',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Symon Brigg',
      Institution_name: 'Soran University',
      enroll_students: 361,
      price: 38,
      thumbnail: 'http://placeimg.com/300/200/tech',
      rating: 4,
      numReviews: 13,
    },
    {
      slug: 'neurology-and-science',
      Course_name: 'Neurology & Science',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Joel Gullis',
      Institution_name: 'Kerman University of Medical Sciences',
      enroll_students: 801,
      price: 24,
      thumbnail: 'http://placeimg.com/300/200/animals',
      rating: 3,
      numReviews: 10,
    },
    {
      slug: 'machine-learning',
      Course_name: 'Machine Learning',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Chuck Bazoge',
      Institution_name: 'Brevard College',
      enroll_students: 442,
      price: 49,
      thumbnail: 'http://placeimg.com/300/200/tech',
      rating: 5,
      numReviews: 10,
    },
    {
      slug: 'UI-UX-design',
      Course_name: 'UI/UX Design',
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      course_instructor: 'Mada Chelnam',
      Institution_name: 'Andong National University',
      enroll_students: 595,
      price: 100,
      thumbnail: 'http://placeimg.com/300/200/nature',
      rating: 4,
      numReviews: 13,
    },
    {
      slug: 'artificial-intelligence',
      Course_name: 'Artificial Intelligence',
      course_instructor: "Glenna D'Onisi",
      description:
        'loremipsummmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
      Institution_name: 'College of Technology at Jeddah',
      enroll_students: 271,
      price: 75,
      thumbnail: 'http://placeimg.com/300/200/tech',
      rating: 3,
      numReviews: 14,
    },
  ],
};

export default data;
