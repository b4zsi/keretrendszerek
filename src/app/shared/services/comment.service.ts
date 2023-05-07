import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, concatWith, take } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { Comment } from '../model/Comment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsCollection: AngularFirestoreCollection<Comment>;
  comments: Observable<Comment[]>;

  constructor(private firestore: AngularFirestore, private snackbarService:SnackBarService, private userService :UserService) {
    this.commentsCollection = firestore.collection<Comment>('comments', ref => ref.orderBy('date', 'desc').limit(5));
    this.comments = this.commentsCollection.valueChanges();
  }

   getAll():Comment[]{
      let kommentek: Comment[] = [];
      this.comments.pipe(take(1)).subscribe((comment)=>{
        for(let fos of comment){
          kommentek.push(fos)
        }
      });
      return kommentek;
  }

  addComment(comment: Comment, id:string) {
    this.firestore.collection('comments').doc(id).set(comment).then(() => {
      this.snackbarService.openWithMessage("Komment sikeresen hozzáadva.");
    }).catch((error) => {
      this.snackbarService.openWithMessage("Valami hiba történt.")
    });

  }
  deleteComment(id:string) {
    this.firestore.collection('comments').doc(id).delete();

  }
}
