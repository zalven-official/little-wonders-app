import { IStory } from "./types";
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;


export interface FetchStoriesParams {
  gradeLevel?: string;
  readingMode?: string;
  testType?: string;
  isPhilIri?: boolean;
  sort?: 'asc' | 'desc';
  title?: string;
}

export const createStory = async (newStory: IStory): Promise<IStory | undefined> => {
  try {
    newStory.title = newStory.title.toLowerCase().trim()
    const response = await axios.post<IStory>(`${serverUrl}/api/stories`, newStory);
    return response.data;
  } catch (error) {
    console.error('Failed to create story', error);
    return undefined;
  }
};

export const fetchStories = async (params?: FetchStoriesParams): Promise<IStory[] | undefined> => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.gradeLevel) queryParams.append('gradeLevel', params.gradeLevel);
    if (params?.readingMode) queryParams.append('readingMode', params.readingMode);
    if (params?.testType) queryParams.append('testType', params.testType);
    if (params?.isPhilIri !== undefined) queryParams.append('isPhilIri', params.isPhilIri.toString());
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.title) queryParams.append('title', params.title);
    const response = await axios.get<IStory[]>(`${serverUrl}/api/stories?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stories', error);
  }
};

// Get a story by ID
export const fetchStoryById = async (id: string): Promise<IStory | undefined> => {
  try {
    const response = await axios.get<IStory>(`${serverUrl}/api/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch story', error);
  }
};

export const updateStory = async (id: string, updatedStory: IStory) => {
  try {
    await axios.put(`${serverUrl}/api/stories/${id}`, updatedStory);
  } catch (error) {
    console.error('Failed to update story', error);
  }
};

// Delete a story
export const deleteStory = async (id: string) => {
  try {
    await axios.delete(`${serverUrl}/api/stories/${id}`);
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