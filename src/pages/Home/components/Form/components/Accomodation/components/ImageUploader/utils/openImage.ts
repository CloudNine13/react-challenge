const openImageEventListener = (imageDiv: HTMLDivElement, imageUrl: string) => {
  imageDiv.querySelector('img')?.addEventListener('click', () => {
    const newWindow = window.open();
    const img = newWindow!.document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    newWindow?.document.body.appendChild(img);
  });
};

export { openImageEventListener };
