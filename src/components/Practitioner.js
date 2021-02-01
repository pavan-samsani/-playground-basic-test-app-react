import React, { useEffect, useState } from "react";
import { getPractitioners } from "../services";
import PractitionerCard from "./PractitionerCard";

export default function Practitioner() {
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setloading] = useState(false);

  const flattenPractitionerObj = (response) => {
    return (response.data.entry || []).map((item) => {
      const name = item.resource.name || [];
      return {
        id: item.resource.id,
        name: `${((name[0] || {}).given || []).join(" ")} ${
          (name[0] || {}).family || ""
        }`,
        gender: item.resource.gender,
        dob: item.resource.birthDate,
        photo:
          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
      };
    });
  };
  useEffect(() => {
    setloading(true);
    getPractitioners().then((res) => {
      setPractitioners(flattenPractitionerObj(res));
      setloading(false);
    });
  }, [setPractitioners]);

  const handleDelete = (id) => {
    setPractitioners(practitioners.filter((p) => p.id !== id));
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {practitioners.map((practitioner) => {
            return (
              <PractitionerCard
                onDelete={handleDelete}
                key={practitioner.id}
                {...practitioner}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
