import { IStory } from "./types";
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;



export const createStory = async (newStory: IStory): Promise<IStory | undefined> => {
  try {
    const response = await axios.post<IStory>(`${serverUrl}/api/stories`, newStory);
    return response.data;
  } catch (error) {
    console.error('Failed to create story', error);
    return undefined;
  }
};

export const fetchStories = async (): Promise<IStory | undefined> => {
  try {
    const response = await axios.get<IStory>('/api/stories');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stories', error);
  }
};

// Get a story by ID
export const fetchStoryById = async (id: string): Promise<IStory | undefined> => {
  try {
    const response = await axios.get<IStory>(`/api/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch story', error);
  }
};

export const updateStory = async (id: string, updatedStory: IStory) => {
  try {
    await axios.put(`/api/stories/${id}`, updatedStory);
  } catch (error) {
    console.error('Failed to update story', error);
  }
};

// Delete a story
export const deleteStory = async (id: string) => {
  try {
    await axios.delete(`/api/stories/${id}`);
  } catch (error) {
    console.error('Failed to delete story', error);
  }
};

// Filter story
export const fetchFilteredStories = async (filters: {
  gradeLevel?: string;
  testType?: string;
  readingMode?: string;
  date?: 'Newest' | 'Oldest' | 'Date';
  search?: string;
}): Promise<IStory[] | undefined> => {
  try {
    const response = await axios.get<IStory[]>(`${serverUrl}/api/stories`, {
      params: {
        gradeLevel: filters.gradeLevel,
        testType: filters.testType,
        readingMode: filters.readingMode,
        date: filters.date,
        search: filters.search,
      },
    });
    return response.data;
  } catch (err) {
    return undefined
  }
}