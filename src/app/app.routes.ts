import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SpeacializationpageComponent } from './speacializationpage/speacializationpage.component';
import { SubspecializationComponent } from './subspecialization/subspecialization.component';
import { FacilitatesComponent } from './facilitates/facilitates.component';
import { FacilityComponent } from './facility/facility.component';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { NewsBlogsPageComponent } from './news-blogs-page/news-blogs-page.component';
import { BlogsNewsComponent } from './blogs-news/blogs-news.component';
import { BlognewsComponent } from './blognews/blognews.component';
import { DoctorsallComponent } from './doctorsall/doctorsall.component';
import { UpdatesectionsComponent } from './updatesections/updatesections.component';
import { DiseasePageComponent } from './disease-page/disease-page.component';
import { AllspecializationsComponent } from './allspecializations/allspecializations.component';
import { AlldiseasesComponent } from './alldiseases/alldiseases.component';

export const routes: Routes = [
    {path : "",component : MainComponent},
    {path : "main",component : MainComponent},
    {path : "login",component : LoginComponent},
    {path : "profile",component : ProfileComponent},
    {path : "speacialization/:speacializationid", component : SpeacializationpageComponent},
    {path : "subspeacialization/:subspeacializationid",component : SubspecializationComponent},
    {path : "facilites/:facilitesid",component : FacilitatesComponent},
    {path : "availablefacilites",component : FacilityComponent},
    {path : "doctor/:doctorid",component : DoctorPageComponent},
    {path : "about-us",component : AboutPageComponent},
    {path : "viewsreviews", component : ReviewsPageComponent},
    {path : "update-page",component : UpdatePageComponent},
    {path : "news-blogs",component : NewsBlogsPageComponent},
    {path : "newsblog/:newsid",component : BlognewsComponent},
    {path : "alldoctors",component : DoctorsallComponent},
    {path : "updatesections",component : UpdatesectionsComponent},
    {path : "diseases/:diseaseid",component : DiseasePageComponent},
    {path : "allspecializations",component : AllspecializationsComponent},
    {path : "alldiseases",component : AlldiseasesComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }