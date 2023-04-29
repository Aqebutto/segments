// app.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  selectedCharCount = 0;
  isDrawerOpened = true;
  @ViewChild('drawer') drawer!: MatDrawer;

  ngOnInit(): void {
    this.replaceSpansWithHeadings();
    // this.colorTextEvery3500Chars();
    // this.applyNonH3Font();
  }

  replaceSpansWithHeadings(): void {
    // Select all <p> elements that contain a <span class="c4">
    const paragraphs = document.querySelectorAll('p > span.c4');

    // Iterate over the selected elements and replace each <span> with an <h3>
    paragraphs.forEach((span) => {
      const heading = document.createElement('h3');
      heading.innerHTML = span.innerHTML;

      // Remove the parent <p> element if it contains a <span class="c4">
      const parent = span.parentElement;
      if (parent && parent.tagName === 'P') {
        parent.replaceWith(heading);
      } else {
        span.replaceWith(heading);
      }
    });
  }
  openDrawer(): void {
    this.drawer.open();
  }
  hideH3(): void {
    const headings = document.querySelectorAll('h3');
    headings.forEach((heading) => {
      heading.style.display = 'none';
    });
  }
  showH3(): void {
    const headings = document.querySelectorAll('h3');
    headings.forEach((heading) => {
      heading.style.display = 'block';
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

  logSelectedCharCount(): void {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString();
      console.log(`Selected ${selectedText.length} characters.`);
    } else {
      console.warn('No text selected.');
    }
  }
  applyNonH3Font(): void {
    const paragraphs = document.querySelectorAll('p:not(h3)');
    paragraphs.forEach((p) => {
      p.classList.add('non-h3');
    });
  }
}
