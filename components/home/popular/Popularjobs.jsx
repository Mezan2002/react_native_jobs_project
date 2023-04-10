import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { useRouter } from "expo-router";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import { COLORS, SIZES } from "../../../constants";
import { useFetch } from "../../../Hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
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
          <FlatList
            horizontal={true}
            data={data}
            renderItem={({ item }) => <PopularJobCard item={item} />}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
