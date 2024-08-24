import { IStory } from "./types";

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
    newStory.title = newStory.title.toLowerCase().trim();
    const response = await fetch(`${serverUrl}/api/stories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStory),
    });

    if (!response.ok) {
      throw new Error('Failed to create story');
    }

    return await response.json();
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

    const response = await fetch(`${serverUrl}/api/stories?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch stories');
    }

    return await response.json();
  } catch (error) {
    alert(error);
    console.error('Failed to fetch stories', error);
  }
};

export const fetchStoryById = async (id: string): Promise<IStory | undefined> => {
  try {
    const response = await fetch(`${serverUrl}/api/stories/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch story');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch story', error);
  }
};

export const updateStory = async (id: string, updatedStory: IStory) => {
  try {
    const response = await fetch(`${serverUrl}/api/stories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStory),
    });

    if (!response.ok) {
      throw new Error('Failed to update story');
    }
  } catch (error) {
    console.error('Failed to update story', error);
  }
};

export const deleteStory = async (id: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/stories/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete story');
    }
  } catch (error) {
    console.error('Failed to delete story', error);
  }
};

export const fetchFilteredStories = async (filters: {
  gradeLevel?: string;
  testType?: string;
  readingMode?: string;
  date?: 'Newest' | 'Oldest' | 'Date';
  search?: string;
}): Promise<IStory[] | undefined> => {
  try {
    const response = await fetch(`${serverUrl}/api/stories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Construct query params manually
      body: new URLSearchParams({
        gradeLevel: filters.gradeLevel ?? '',
        testType: filters.testType ?? '',
        readingMode: filters.readingMode ?? '',
        date: filters.date ?? '',
        search: filters.search ?? '',
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch filtered stories');
    }

    return await response.json();
  } catch (err) {
    console.error('Failed to fetch filtered stories', err);
    return undefined;
  }
};
