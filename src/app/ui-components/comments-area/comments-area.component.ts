import { Component, Input, OnInit } from '@angular/core';
import { Post, PostComment } from '../../announcements/post';
import { IconService } from 'src/app/services/icon.service';
import { AnnouncementsService } from 'src/app/announcements/announcements.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-comments-area',
  templateUrl: './comments-area.component.html',
  styleUrls: ['./comments-area.component.scss'],
})
export class CommentsAreaComponent implements OnInit {
  @Input() post!: Post;

  protected newComment: Partial<PostComment> = {
    message: '',
  };

  protected randomFunnyPlaceholderMessage = '';

  constructor(
    public icon: IconService,
    private announcementsService: AnnouncementsService,
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.randomFunnyPlaceholderMessage =
      this.generateRandomFunnyPlaceholderMessage();
  }

  ngOnInit(): void {
    if (!this.post) {
      throw new Error('Post is required');
    }
  }

  protected addComment() {
    this.newComment.id = this.angularFirestore.createId();
    this.newComment.createdDate = Date.now();
    this.newComment.createdByUserName = this.authService.userDisplayName;

    if (!this.post.comments) {
      this.post.comments = [];
    }

    this.post.comments.push(this.newComment as PostComment);

    this.announcementsService
      .updatePost(this.post.id, this.post)
      .subscribe((res) => {
        this.newComment = {
          message: '',
        };
        this.randomFunnyPlaceholderMessage =
          this.generateRandomFunnyPlaceholderMessage();
      });
  }

  private generateRandomFunnyPlaceholderMessage(): string {
    const messages = [
      "Please type a comment for everyone to see. Please keep it workplace appropriate...just kidding! We're all family here! 🤪",
      'What are you waiting for? Type a comment already! ⏰',
      'Ok, a nerd spent a ton of time building a comment section. Please use it by adding a comment! 🤓',
      "Add a comment. Don't be shy! 🤗",
      "Add a comment. We promise we won't judge you! 🤞",
      'Add a comment. We know you have something to say! 🗣',
      'Release your inner thoughts and add a comment! 💭',
      'Comments are magical. Add one! 🧙‍♂️',
      'Add a comment. We know you want to! 🤫',
      'Here\'s a suggestion for a comment: "I love this app!" 🥰',
      'Here\'s a suggestion for a comment: "This app is awesome!" 🤩',
      'Here\'s a suggestion for a comment: "This app is the bomb dot com!" 💣',
      'Here\'s a suggestion for a comment: "Confess your inner love for pizza!" 🍕',
      'Here\'s a suggestion for a comment: "Write a haiku about tacos!" 🌮',
      'Here\'s a suggestion for a comment: "Tell everyone about the craziest dream you\'ve ever had." 💤',
      'Here\'s a suggestion for a comment: "Tell everyone your opinion on the last movie you watched." 🎬',
      'Here\'s a suggestion for a comment: "Tell everyone your opinion on the the last book you read." 📚',
      'Life advice: write a comment. We can all be like your therapist or something. 🤷‍♂️',
      'Life advice: writing comments frees your inner soul. Share your soul with us. We want it! 🧘‍♀️',
      "Write a comment. I'll be your best friend. 🤝",
      'Free hugs for those who write comments! 🤗',
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }
}
