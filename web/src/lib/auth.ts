'use client';
import api from './api';

export async function fetchMe() {
  try {
    const { data } = await api.get('/auth/me');
    return data?.data;
  } catch {
    return null;
  }
}
