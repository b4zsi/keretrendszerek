import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators, AsyncValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/shared/model/Comment';
import { CommentService } from 'src/app/shared/services/comment.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  commentForm!: FormGroup;
  comments!: Observable<Comment[]>;
  constructor(private fb: FormBuilder, private CommentService :CommentService, private userService :UserService) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)],],
      comment: ['', [Validators.required, Validators.minLength(10)]],
    });
    //this.comments = this.CommentService.getAll();
  }

  onSubmit() {
    const comment: Comment = {
      title: this.commentForm.get('title')!.value ,
      comment: this.commentForm.get('comment')!.value,
      date: new Date(),
    };
    this.CommentService.addComment(comment);
    this.commentForm.reset();
  }

  deleteComment(comment:Comment) {
    this.CommentService.deleteComment(comment);
  }

  async isAdmin() :Promise<boolean> {
    return this.userService.isAdminUser(this.userService.loggedUser?.email as string);
  }

}
