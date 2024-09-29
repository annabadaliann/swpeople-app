"use client";
import type { FC } from "react";
import { memo } from "react";
import Link from "next/link";
import { Card, Button, Typography } from "antd";
import { Person } from "@/lib/store/services/people/people.type";

const { Title, Text } = Typography;

interface PersonDetailsContainerProps {
  person: Person;
}

const PersonDetailsContainer: FC<PersonDetailsContainerProps> = memo(({ person }) => {
  return (
    <div className="bg-gray-100 w-full h-screen">
      <div className="max-w-3xl mx-auto py-8 px-4  ">
        <Link href="/people">
          <Button
            type="link"
            className="mb-4 px-0 text-gray-500 hover:text-blue-600"
          >
            &larr; Back
          </Button>
        </Link>

        <Card className="shadow-lg rounded-lg h-[400px] p-3" bordered={false}>
          <Title level={3} className="mb-6">
            {person.name}
          </Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <Text strong>Height:</Text> {person.height} cm
            </div>
            <div>
              <Text strong>Mass:</Text> {person.mass} kg
            </div>
            <div>
              <Text strong>Hair Color:</Text> {person.hair_color}
            </div>
            <div>
              <Text strong>Eye Color:</Text> {person.eye_color}
            </div>
            <div>
              <Text strong>Skin color:</Text> {person.skin_color}
            </div>
            <div>
              <Text strong>Birth Year:</Text> {person.birth_year}
            </div>
            <div>
              <Text strong>Gender:</Text> {person.gender}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
});

PersonDetailsContainer.displayName = "PersonDetailsContainer";

export default PersonDetailsContainer;
