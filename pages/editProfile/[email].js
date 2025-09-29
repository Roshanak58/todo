import ProfileForm from "@/components/module/ProfileForm";
import { useRouter } from "next/router";
import { useState } from "react";

function Index() {
    const router = useRouter();
    const { email, name, lastName } = router.query;
    
    const editProf = "edit";
    const [namee, setName] = useState(name);
    const [lastNamee, setLastName] = useState(lastName);
    const [password, setPassword] = useState("");
    
    
  const EditHandler = async () => {
    
      const res = await fetch("/api/profile", {
          method: "PATCH",
          body: JSON.stringify({ namee, lastNamee, password }),
          headers: { "Content-Type": "application/api" },
        });
    const data = await res.json();
    if (data.status==="success")router.push("/")
  };

  return (
    <ProfileForm
      editProf={editProf}
      name={namee}
      lastName={lastNamee}
      password={password}
      setName={setName}
      setLastName={setLastName}
      setPassword={setPassword}
      EditHandler={EditHandler}
    />
  );
}

export default Index;
