import { Component } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-update-provider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-provider.component.html',
  styleUrl: './update-provider.component.css'
})
export class UpdateProviderComponent {

  public id: any;
  public providerToUpdate: any;
  public name: any;
  public email: any;
  public adress: any;
  public urlUpload = environment.urlUploadImage;
  selectedFile!: File;
  public nomOldImage = "";
  public nomNewImage = "";
  constructor(private service: ProviderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      }
    );
    this.providerToUpdate = this.service.getProvider(this.id).subscribe(
      (response: any) => {
        //console.log(response);
        this.name = response["name"];
        this.email = response["email"];
        this.adress = response["address"];
        this.nomOldImage = response["logo"];
      }
    );
    // this.initFormUpdateProvider(myform);
  }

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    if (event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }
  updateProvider() {
    /*
     this.providerToUpdate = {
       'name': this.name,
       'email': this.email,
       'address': this.adress,
       'id': this.id
     }
     this.service.updateProvider(this.providerToUpdate).subscribe(
       response => {
         //console.log(response);
         this.router.navigate(['listProvider']);
       }
     );*/

    const provider = new FormData();
    if (this.selectedFile != null) {
      console.log("info :" + this.selectedFile)
      provider.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    //provider.append('imageName',this.selectedFile.name);
    provider.append('name', this.name);
    provider.append('email', this.email);
    provider.append('address', this.adress);
    provider.append('id', this.id);

    this.service.updateProvider(provider).subscribe(
      response => {
        this.router.navigate(['listProvider']);
      }
    );


  }
}
