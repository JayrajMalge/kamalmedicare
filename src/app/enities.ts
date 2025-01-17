// appointment.entity.ts
export class Appointment {
    appointmentid!: number;
    patient?: number;
    doctor?: number;
    appointmentdate?: Date;
    status?: 'Scheduled' | 'Completed' | 'Canceled';
  }
  
  // casestudy.entity.ts
  export class CaseStudy {
    casestudyid!: number;
    treatmentid?: number;
    title?: string;
    description?: string;
    result?: string;
    dateofcase?: Date;
  }
  
  // casestudy-image.entity.ts
  export class CaseStudyImage {
    imgid!: number;
    image?: Blob;
  }
  
  // doctor.entity.ts
  export class Doctor {
    doctorid!: number;
    name?: string;
    about?: string;
    email?: string;
    phone?: number;
    profilephoto? : Blob;
    schedule_from?: string;
    schedule_to?: string;
    joindate?: Date;
    resigndate?: Date;
  }
  
  // doctor-specialization.entity.ts
  export class DoctorSpecialization {
    doctorspeacializationid!: number;
    doctor?: number;
    speacialization?: number;
  }
  
  // education.entity.ts
  export class Education {
    education_id!: number;
    degree?: string;
    university_name?: string;
    fromdate?: Date;
    todate?: Date;
    doctor?: number;
  }
  
  // experience.entity.ts
  export class Experience {
    experience_id!: number;
    field?: string;
    hospital_name?: string;
    years?: number;
    fromdate?: Date;
    todate?: Date;
    doctor?: number;
  }
  
  // facility.entity.ts
  export class Facility {
    facilitesid!: number;
    facility_name?: string;
    description?: string;
    availability?: 'yes' | 'no';
    facilitytype?: string;
  }
  
  // facility-image.entity.ts
  export class FacilityImage {
    imgid!: number;
    image?: Blob;
  }
  
  // faq.entity.ts
  export class FAQ {
    faquestionid!: number;
    user?: number;
    question?: string;
    answer?: string;
    creatat?: Date;
    answerat?: Date;
  }
  
  // news.entity.ts
  export class News {
    newsid!: number;
    tittle?: string;
    description?: string;
    newsdate?: Date;
  }
  
  // news-image.entity.ts
  export class NewsImage {
    newsid?: number;
    image?: Blob;
  }
  
  // page.entity.ts
  export class Page {
    pageid!: number;
    tittle?: string;
    description?: string;
    slug?: string;
    createat?: Date;
    updateat?: Date;
  }
  
  // patient.entity.ts
  export class Patient {
    patientid!: number;
    name?: string;
    age?: number;
    gender?: 'Male' | 'Female';
    phoneno?: bigint;
    address?: string;
  }
  
  // section.entity.ts
  export class Section {
    sectionid!: number;
    pageid?: number;
    heading?: string;
    content?: string;
    sectionmedia?: number;
  }
  
  // section-media.entity.ts
  export class SectionMedia {
    sectionimgid!: number;
    imgdata?: Blob;
    viddata?: Blob;
  }
  
  // specialization.entity.ts
  export class Specialization {
    speacialization_id!: number;
    field_name?: string;
    description?: string;
  }
  
  // sub-specialization.entity.ts
  export class SubSpecialization {
    subspeacializationid!: number;
    name?: string;
    description?: string;
    speacialization?: number;
  }
  
  // treatment.entity.ts
  export class Treatment {
    treatmentid!: number;
    tittle?: string;
    description?: string;
    doctor?: number;
    patient?: number;
    cost?: number;
    tratmentdate?: Date;
  }
  
  // user.entity.ts
  export class User {
    userid!: number;
    username?: string;
    hashedpassword?: string;
    email?: string;
    role?: 'Admin' | 'Visitor';
    createat?: Date;
    updateat?: Date;
  }
  
  export class SubSpecializationimgvideo{
    subspecializationimgvideoid? : 0;
    imgvid? : Blob;
  }