export const SET_EMAIL = 'SET_EMAIL';

export function createSetEmail(email) {
  return { type: SET_EMAIL, payload: email };
}
