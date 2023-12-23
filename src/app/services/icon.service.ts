import { Injectable } from '@angular/core';
import {
  faDumbbell,
  faUser,
  faEdit,
  faPlus,
  faPencilAlt,
  faTools,
  faCalendarAlt,
  faCheckCircle,
  faTrash,
  faSun,
  faCloud,
  faUmbrella,
  faSnowman,
  faMoon,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  public faDumbbell = faDumbbell;
  public faUser = faUser;
  public faGoogle = faGoogle;
  public faEdit = faEdit;
  public faPlus = faPlus;
  public faPencilAlt = faPencilAlt;
  public faTools = faTools;
  public faCalendarAlt = faCalendarAlt;
  public faCheckCircle = faCheckCircle;
  public faInstagram = faInstagram;
  public faTrash = faTrash;
  public faSun = faSun;
  public faCloud = faCloud;
  public faUmbrella = faUmbrella;
  public faSnowman = faSnowman;
  public faMoon = faMoon;
  public faComment = faComment;

  constructor() {}
}
