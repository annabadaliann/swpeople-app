import { redirect } from "next/navigation";
import PeopleService from "@/lib/store/services/people/people.service";

import PersonDetailsContainer from "./person-details.container";

async function PersonDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const person = await PeopleService.getPerson(id);

  if (!person) {
    return redirect("/persons");
  }

  return <PersonDetailsContainer person={person} />;
}

export default PersonDetails;
