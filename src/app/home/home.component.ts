import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from  '@angular/forms';
import { UserService } from '../user.service';
import { UserResponse } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userForm: FormGroup;
  isSubmitted  =  false;
  response: UserResponse ={
    message:'',
    type:undefined
  };
  @ViewChild('fileInput') fileInput: ElementRef;



  constructor(private formBuilder: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    const webaddresspattern='^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
    this.userForm  =  this.formBuilder.group({
        userName: ['', Validators.required],
        userEmail: ['', [Validators.required, Validators.email]],
        userWebAddress: ['', [Validators.required,Validators.pattern(webaddresspattern)]],
        userCoveLetter: ['', Validators.required],
        userAttacment:[''],
        userWorking:['yes'],
        recaptchaReactive: [null, Validators.required]
    });
  }

  get f() { return this.userForm.controls; }

  


  onFileChange(event) {
    let reader:any= new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userForm.get('userAttacment').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }


  submitUser(){
    
    this.isSubmitted = true;

        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }
            // display form values on success
        this.userService.submitUser(this.userForm.value).subscribe(
            results=>{
              this.response=results;
              if(results.type===true){
                this.onReset();
              }
              

          },
          error=>{
            console.log('error',error);
            this.response=error;
           
           }
        )
         // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.userForm.value, null, 4));

  }

  onReset() {
      this.isSubmitted = false;
      this.userForm.reset();
      this.userForm.get('userWorking').setValue('yes');
      this.fileInput.nativeElement.value = '';
  }


}
