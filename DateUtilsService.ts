import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  private readonly defaultOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric' 
  };

  formatDate(date: Date, options: Intl.DateTimeFormatOptions = this.defaultOptions): string {
    return new Intl.DateTimeFormat(navigator.language, options).format(date);
  }

  addDaysToDate(date: Date, days: number): Date {
    return new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
  }

  formatRelativeTime(date: Date): string {
    const current = new Date();
    const diff = current.getTime() - date.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    if (days >= 1) {
      return `${Math.floor(days)} day(s) ago`;
    } else if (hours >= 1) {
      return `${Math.floor(hours)} hour(s) ago`;
    } else if (minutes >= 1) {
      return `${Math.floor(minutes)} minute(s) ago`;
    } else {
      return `${Math.floor(seconds)} second(s) ago`;
    }
  }
}