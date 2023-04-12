import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  JobFooter,
  JobAbout,
  JobTabs,
  Company,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import { useFetch } from "../../Hook/useFetch";

const JobDetails = () => {
  const [refreshing, setRefreshing] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const onRefresh = () => {};

  const { data, isLoading, refetch, error } = useFetch("job-details", {
    job_id: params.id,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            ></ScreenHeaderBtn>
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
            ></ScreenHeaderBtn>
          ),
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            ></RefreshControl>
          }
        >
          {isLoading ? (
            <ActivityIndicator
              color={COLORS.primary}
              size="large"
            ></ActivityIndicator>
          ) : error ? (
            <Text>Something Went Wrong!</Text>
          ) : data.length === 0 ? (
            <Text>No Data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs />
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
