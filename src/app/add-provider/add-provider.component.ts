import { Component } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-provider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-provider.component.html',
  styleUrl: './add-provider.component.css'
})
export class AddProviderComponent {

  provider: any;
  selectedFile!: File;
  constructor(private service: ProviderService, private router: Router) {
  }

  //Gets called when the user selects an image
  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
    //console.log(this.selectedFile);
  }
/*
  createProvider(myform: any) {
    this.service.createProvider(myform).subscribe(
      response => {
        //console.log(response);
        // forcer la redirection que si j'obtient la réponse du serveur backend
        this.router.navigate(['listProvider']);
      }
      );
  }*/

  createProvider(myform:any) {
    const provider = new FormData();
    provider.append('imageFile', this.selectedFile,this.selectedFile.name);
    //provider.append('imageName',this.selectedFile.name);
    provider.append('name', myform.value.providerName);
    provider.append('email', myform.value.providerEmail);
    provider.append('address', myform.value.providerAdress);

    this.service.createProvider(provider).subscribe(
      (response) =>{
        console.log(response);
        this.router.navigate(['listProvider']);
      }, error => {
        console.error(error);
        // Handle error, e.g., show an error message
      }
    );

  }

}
