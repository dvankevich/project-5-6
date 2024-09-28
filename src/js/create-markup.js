export function createMarkup(array) {
  return array.map(item => `
      <li class="gallery-item">
        <img src="${item.urls.small}" alt="${item.description}" />
      </li>
    `).join('')
  

  
}