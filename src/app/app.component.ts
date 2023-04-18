import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'segments';

  ngOnInit(): void {
    this.replaceSpansWithHeadings();
    const charCount = this.countCharsInParagraphs();
    console.log(`Total characters: ${charCount}`);
  }
  replaceSpansWithHeadings(): void {
    // Select all <p> elements that contain a <span class="c4">
    const paragraphs = document.querySelectorAll('p > span.c4');

    // Iterate over the selected elements and replace each <span> with an <h3>
    paragraphs.forEach((span) => {
      const heading = document.createElement('h3');
      heading.innerHTML = span.innerHTML;
      if (span.parentNode) {
        span.parentNode.replaceChild(heading, span);
      }
    });
  }

  // countCharsInParagraphs(): void {
  //   let charCount = 0;
  //   let backgroundIndex = 0;
  //   const backgroundColors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99'];
  //   const paragraphs = document.querySelectorAll(
  //     'p:not(:has(span.c4)):not(:has(h3))'
  //   );

  //   paragraphs.forEach((p) => {
  //     const textContent = p.textContent;
  //     if (!textContent) {
  //       return;
  //     }

  //     const chunks = textContent.split('');

  //     let currentChunk = '';
  //     chunks.forEach((chunk) => {
  //       if (chunk === '<' || chunk === '>') {
  //         return;
  //       }

  //       currentChunk += chunk;
  //       charCount++;

  //       if (charCount % 3500 === 0) {
  //         const backgroundColor =
  //           backgroundColors[backgroundIndex % backgroundColors.length];
  //         const newChunk = `<span style="background-color: ${backgroundColor};">${currentChunk}</span>`;
  //         p.innerHTML = p.innerHTML.replace(currentChunk, newChunk);
  //         currentChunk = '';
  //         backgroundIndex++;
  //       }
  //     });

  //     if (currentChunk) {
  //       const backgroundColor =
  //         backgroundColors[backgroundIndex % backgroundColors.length];
  //       const newChunk = `<span style="background-color: ${backgroundColor};">${currentChunk}</span>`;
  //       p.innerHTML = p.innerHTML.replace(currentChunk, newChunk);
  //       backgroundIndex++;
  //     }
  //   });
  // }
  countCharsInParagraphs(): void {
    let charCount = 0;
    let chunkCount = 0;
    const paragraphs = document.querySelectorAll(
      'p:not(:has(span.c4)):not(:has(h3))'
    );

    paragraphs.forEach((p) => {
      const textContent = p.textContent;
      if (!textContent) {
        return;
      }

      const chunks = textContent.split('');

      let currentChunk = '';
      let currentChunkIndex = 0;
      chunks.forEach((chunk) => {
        if (chunk === '<' || chunk === '>') {
          return;
        }

        currentChunk += chunk;
        charCount++;

        if (charCount % 3500 === 0) {
          const backgroundColor = `background-color: rgba(255, 255, 255, ${
            chunkCount % 2 === 0 ? 0.5 : 0.6
          })`;
          const newChunk = `<span style="${backgroundColor};">${currentChunk}</span>`;
          p.innerHTML = p.innerHTML.replace(currentChunk, newChunk);
          currentChunk = '';
          currentChunkIndex = 0;
          chunkCount++;
        } else {
          currentChunkIndex++;
        }
      });

      if (currentChunk) {
        const backgroundColor = `background-color: rgba(255, 255, 255, ${
          chunkCount % 2 === 0 ? 0.5 : 0.6
        })`;
        const newChunk = `<span style="${backgroundColor};">${currentChunk}</span>`;
        p.innerHTML = p.innerHTML.replace(currentChunk, newChunk);
        chunkCount++;
      }
    });
  }
}
