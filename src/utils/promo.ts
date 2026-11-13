// Remembers which promo a visitor clicked, so the booking email can say
// "promo: black_friday" and you know which discount to honour.
const KEY = 'jt_clicked_promo';

export function setClickedPromo(id?: string): void {
  try {
    if (id) sessionStorage.setItem(KEY, id);
    else sessionStorage.removeItem(KEY);
  } catch {
    /* storage can be blocked; the promo tag is a nice-to-have */
  }
}

export function getClickedPromo(): string {
  try {
    return sessionStorage.getItem(KEY) || '';
  } catch {
    return '';
  }
}
