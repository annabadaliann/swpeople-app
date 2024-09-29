import { Person } from "./people.type";

const BASE_URL: string = process.env.BASE_URL || "https://swapi.dev/api";

class PeopleService {
  static async getPeople({
    searchTerm = "",
    page = 1,
  }: {
    searchTerm?: string | null;
    page?: number | null;
  }) {
    try {
      const response = await fetch(
        `${BASE_URL}/people?search=${searchTerm}&page=${page}`
      );

      const data = await response.json();
      return {
        ...data,
        results: data?.results?.map((item: Person) => {
          const urlArr = item.url.split("/");
          return {
            ...item,
            id: urlArr[urlArr.length - 2],
          };
        }),
      };
    } catch (error) {
      throw error;
    }
  }

  static async getPerson(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/people/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default PeopleService;
