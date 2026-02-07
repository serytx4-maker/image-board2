// Получаем контейнеры
const threadsContainer = document.getElementById('threads');
const threadForm = document.getElementById('threadForm');

// Открытие данных из localStorage
let threads = JSON.parse(localStorage.getItem('threads')) || [];

// Функция для отображения тредов
function renderThreads() {
  threadsContainer.innerHTML = '';
  threads.forEach((thread, index) => {
    const threadDiv = document.createElement('div');
    threadDiv.className = 'thread';

    // Создаём HTML с условием для изображения
    const imageHTML = thread.image ? `<img src="${thread.image}" alt="${thread.title}" />` : '';

    threadDiv.innerHTML = `
      <h3>${thread.title}</h3>
      ${imageHTML}
      
      <div class="comment-section" id="comments-${index}">
        <h4>Комментарии</h4>
        ${thread.comments.map((c, i) => `
          <div class="comment">
            ${c}
          </div>
        `).join('')}
        <form class="comment-form" data-index="${index}">
          <input type="text" placeholder="Комментарий" required />
          <button type="submit">Отправить</button>
        </form>
      </div>
    `;

    threadsContainer.appendChild(threadDiv);
  });

  // Назначаем обработчики для новых форм комментариев
  document.querySelectorAll('.comment-form').forEach(form => {
    form.addEventListener('submit', handleCommentSubmit);
  });
}

// Обработка создания нового треда
document.getElementById('threadForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('threadTitle').value;
  const image = document.getElementById('threadImage').value.trim();

  const newThread = {
    title,
    image: image || '', // если поле пустое, ставим ''
    comments: []
  };
  threads.push(newThread);
  localStorage.setItem('threads', JSON.stringify(threads));
  renderThreads();
  // Очистить форму
  e.target.reset();
});

// Обработка комментариев
function handleCommentSubmit(e) {
  e.preventDefault();
  const index = e.target.dataset.index;
  const commentInput = e.target.querySelector('input');
  const commentText = commentInput.value;

  threads[index].comments.push(commentText);
  localStorage.setItem('threads', JSON.stringify(threads));
  renderThreads();
}

