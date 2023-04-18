// app.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.replaceSpansWithHeadings();
    this.colorTextEvery3500Chars();
  }

  private replaceSpansWithHeadings(): void {
    const paragraphs = document.querySelectorAll('p > span.c4');
    paragraphs.forEach((span) => {
      const heading = document.createElement('h3');
      heading.innerHTML = span.innerHTML;
      if (span.parentNode) {
        span.parentNode.replaceChild(heading, span);
      }
    });
  }

  private colorTextEvery3500Chars(): void {
    const paragraphs = document.querySelectorAll('p:not(:has(span.c4))');
    let backgroundIndex = 0;

    paragraphs.forEach((p) => {
      let text = p.textContent;
      if (text === null || text === undefined) {
        return;
      }

      let remainingChars = text.length;

      while (remainingChars > 0) {
        const charsToCount = Math.min(remainingChars, 3500);
        remainingChars -= charsToCount;

        if (remainingChars === 0) {
          const backgroundColors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99'];
          (p as HTMLElement).style.backgroundColor =
            backgroundColors[backgroundIndex % backgroundColors.length];
          backgroundIndex++;
        }

        const textNode = document.createTextNode(text.substr(0, charsToCount));
        p.insertBefore(textNode, p.firstChild);
        text = text.slice(charsToCount);

        if (text === null || text === undefined) {
          break;
        }
      }
    });
  }

  countSelectedChars(): number {
    const selection = window.getSelection();
    if (!selection || !selection.toString()) {
      console.warn('No text selected.');
      return 0;
    }

    const selectedText = selection.toString();
    return selectedText.length;
  }
}
