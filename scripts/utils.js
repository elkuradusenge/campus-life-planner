export function compileRegex(input, flags = "i") {
  try {
    return input ? new RegExp(input, flags) : null;
  } catch {
    return null;
  }
}

export function highlight(text, re) {
  if (!re) return text;
  return text.replace(re, m => `<mark>${m}</mark>`);
}




export function applySavedTheme() {
  const settings = JSON.parse(localStorage.getItem("planner:settings") || "{}");
  const theme = settings.theme || "light";
  document.body.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
}

export const patterns = {
  title: /^\S(?:.*\S)?$/, // no leading/trailing spaces
  dueDate: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  duration: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
  tag: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
  duplicateWord: /\b(\w+)\s+\1\b/
};

export function validateField(name, value) {
  const re = patterns[name];
  if (!re) return true;
  return re.test(value);
}


export function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Remove toast after 4s
  setTimeout(() => {
    toast.remove();
  }, 4000);
}
