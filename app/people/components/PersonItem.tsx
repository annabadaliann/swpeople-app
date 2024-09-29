import { FC } from "react";
import Link from "next/link";
import { Button, Card, Typography } from "antd";
import { Person } from "@/lib/store/services/people/people.type";

const { Title, Text } = Typography;

const PersonItem: FC<{ person: Person }> = ({ person }) => {
  return (
    <Card>
      <Title level={3} className="mb-2">
        {person.name}
      </Title>
      <div className="text-gray-700 mb-4">
        <div>
          <Text strong>Hair Color:</Text> {person.hair_color}
        </div>
        <div>
          <Text strong>Eye Color:</Text> {person.eye_color}
        </div>
        <div>
          <Text strong>Birth Year:</Text> {person.birth_year}
        </div>
        <div>
          <Text strong>Gender:</Text> {person.gender}
        </div>
      </div>
      <Link href={`/people/${person.id}`} className="mt-4" passHref>
        <Button type="primary">View Details</Button>
      </Link>
    </Card>
  );
};

export default PersonItem;
