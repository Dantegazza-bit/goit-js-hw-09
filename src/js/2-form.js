const FORM_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

// 1) Початковий об'єкт поза будь-якими функціями
const formData = {
  email: '',
  message: '',
};

// 3) Відновлення зі сховища при завантаженні
const saved = localStorage.getItem(FORM_KEY);
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    formData.email = parsed.email ?? '';
    formData.message = parsed.message ?? '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch {
    // якщо зіпсовані дані — просто ігноруємо
  }
}

// 2) Делегування input — синхронізуємо об'єкт і сховище
form.addEventListener('input', e => {
  const { name, value } = e.target;

  if (!(name in formData)) return;

  formData[name] = value.trimStart(); // не зрізаємо кінці під час друку, лише початок
  localStorage.setItem(
    FORM_KEY,
    JSON.stringify({
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim(),
    })
  );
});

// Сабміт
form.addEventListener('submit', e => {
  e.preventDefault();

  // Актуальні, обрізані по краях значення
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData); // вивід об’єкта
  localStorage.removeItem(FORM_KEY);

  // очищаємо об’єкт та форму
  formData.email = '';
  formData.message = '';
  form.reset();
});
