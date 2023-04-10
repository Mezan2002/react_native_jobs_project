import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { useRouter } from "expo-router";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { COLORS } from "../../../constants";
import { useFetch } from "../../../Hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
          ></ActivityIndicator>
        ) : error ? (
          <Text> Somthing Went Worng</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            ></NearbyJobCard>
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
