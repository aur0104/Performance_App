import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Onboarding from '../screens/Onboarding';
import Splash from '../screens/Splash';
import WelcomeScreen from '../screens/WelcomeScreen';
import SelectTheme from '../screens/SelectTheme';
import SignUp from '../screens/AuthFlow/SignUp';
import PersonalInformation from '../screens/AuthFlow/PersonalInformation';
import VerifySignup from '../screens/AuthFlow/VerifySignUp';
import AcceptTerms from '../screens/AuthFlow/AcceptTerms';
import AthleteTabNavigation from './AthleteBottomTab';
import Notification from '../screens/AthleteSide/Notifications';
import {useSelector} from 'react-redux';
import {Colors} from '../utils/Colors';
import CommunityDetail from '../screens/AthleteSide/CommunityDetail';
import Language from '../screens/Language';
import RoleSelection from '../screens/RoleSelection';
import LoginScreen from '../screens/Login';
import LetsGoScreen from '../screens/SocialScreen';
import ForgotScreen from '../screens/Forgot';
import ForgotOtpScreen from '../screens/Forgot/ForgotOtpScreen';
import NewPasswordScreen from '../screens/Forgot/NewPasswordScreen';
import ForgotSuccessScreen from '../screens/Forgot/ForgotSuccessScreen';

import SelectSessionScreen from '../screens/AddReview/SelectSessionScreen';
import AddReviewScreen from '../screens/AddReview/AddReviewScreen';
import RequestSubmittedScreen from '../screens/AddReview/RequestSubmittedScreen';
import PublicCommunityDetail from '../screens/AthleteSide/CommunityDetail/PublicCommunityDetail';
import CommunityMember from '../screens/AthleteSide/CommunityMember';
import CommunityChat from '../screens/AthleteSide/CommunityChat';
import UploadPost from '../screens/AthleteSide/UploadPost';
import MatchType from '../screens/AddReview/MatchType';
import PhysicalPerformance from '../screens/AddReview/PhysicalPerformance';
import SkillReviewDetail from '../screens/AddReview/SkillReviewDetail';
import MatchReviewDetail from '../screens/AddReview/SkillReviewDetail/MatchReviewDetail';
import SubmittedMatch from '../screens/AddReview/SubmittedMatch';
import SuccessMembership from '../screens/AddReview/SuccessMembership';
import AddSkill from '../screens/AddReview/AddSkills';
import PerformanceSaved from '../screens/AddReview/PerformanceSaved';
import AddReviewInformation from '../screens/AddReview/AddReviewInformation';
import AthleteSettings from '../screens/AthleteSide/ProfileSection/Settings';
import ChangeTheme from '../screens/AthleteSide/ProfileSection/Settings/ChangeTheme';
import ChangeLanguage from '../screens/AthleteSide/ProfileSection/Settings/ChangeLanguage';
import PrivacyPolicy from '../screens/AthleteSide/ProfileSection/PrivacyPolicy';
import TermsConditions from '../screens/AthleteSide/ProfileSection/TermsConditions';
import Membership from '../screens/AthleteSide/ProfileSection/MemberShip';
import MemberShipPlan from '../screens/AthleteSide/ProfileSection/MemberShip/MembershipPlan';
import BuyPlan from '../screens/AthleteSide/ProfileSection/MemberShip/BuyPlan';
import BuyMembershipSuccess from '../screens/AthleteSide/ProfileSection/MemberShip/BuyMembershipSuccess';
import UpdateAccount from '../screens/AthleteSide/ProfileSection/UpdateAccount';
import UnitPreference from '../screens/AthleteSide/ProfileSection/UnitPerference';
import ChangeUnits from '../screens/AthleteSide/ProfileSection/UnitPerference/ChangeUnits';
import MyFriends from '../screens/AthleteSide/ProfileSection/MyFriends';
import Platforms from '../screens/AuthFlow/Platforms.tsx';
import TrainingCalendars from '../screens/AthleteSide/TraningCalendar';
import AddTraining from '../screens/AthleteSide/TraningCalendar/AddTraining';
import AddTrainingSubmission from '../screens/AthleteSide/TraningCalendar/AddTrainingSubmission.tsx';
import TrainingDetail from '../screens/AthleteSide/TraningCalendar/TrainingDetail/index.tsx';
import EditTraining from '../screens/AthleteSide/TraningCalendar/EditTraining.tsx';
import UpdateTrainingDetail from '../screens/AthleteSide/TraningCalendar/TrainingDetail/UpdateTrainigDetail';
import Endurance from '../screens/AthleteSide/Endurance/index.tsx';
import RunningChallenges from '../screens/AthleteSide/Endurance/RunningChallenges.tsx';
import JoinedSuccessfully from '../screens/AthleteSide/Endurance/JoinedSuccessfuuly.tsx';
import InputChallenges from '../screens/AthleteSide/Endurance/InputChallenges.tsx';
import AttendenceGoal from '../screens/AthleteSide/AttendenceGoal/index.tsx';
import AddGoals from '../screens/AthleteSide/AttendenceGoal/AddGoal.tsx';
import GoalAdded from '../screens/AthleteSide/AttendenceGoal/GoalAdded.tsx';
import Journals from '../screens/AthleteSide/Journals/index.tsx';
import RequestFeedback from '../screens/AthleteSide/RequestFeedback/index.tsx';
import ReceivedRequestDetail from '../screens/AthleteSide/RequestFeedback/RequestDetails/ReceivedRequest.tsx';
import SendRequestDetail from '../screens/AthleteSide/RequestFeedback/RequestDetails/SendRequest.tsx';
import ChallengeDetail from '../screens/AthleteSide/ChallengesDetail/index.tsx';
import SuccessfullyParticipated from '../screens/AthleteSide/ChallengesDetail/SuccessfullyParticipated.tsx';
import MyChallenges from '../screens/AthleteSide/MyChallenges/index.tsx';
import MyChallengeDetail from '../screens/AthleteSide/MyChallenges/MyChallengesDetail.tsx';
import Leaderboard from '../screens/AthleteSide/MyChallenges/Leaderboard/index.tsx';
import ChallengeTraining from '../screens/AthleteSide/MyChallenges/AddTraining/index.tsx';
import ChallengeSubmitted from '../screens/AthleteSide/MyChallenges/AddTraining/ChallengeSubmitted.tsx';
import VideoGuidelines from '../screens/AthleteSide/MyChallenges/VideoGuidelines/index.tsx';
import Badges from '../screens/AthleteSide/Badges/index.tsx';
import GymOwnerSignUp from '../screens/GymOwnerSide/AuthFlow/SignUP/index.tsx';
import GymInformation from '../screens/GymOwnerSide/AuthFlow/GymInformation/index.tsx';
import VerifyBusiness from '../screens/GymOwnerSide/AuthFlow/BusinessVerification/index.tsx';
import AcceptConditions from '../screens/GymOwnerSide/AuthFlow/AcceptConditions/index.tsx';
import ReviewingProfile from '../screens/GymOwnerSide/AuthFlow/ReviewingProfile.tsx';
import OwnerTabNavigation from './GymOwnerSide/index.tsx';
import OwnerProfile from '../screens/GymOwnerSide/ProfileSection/index.tsx';
import OwnerSettings from '../screens/GymOwnerSide/ProfileSection/Settings.tsx';
import OwnerAccount from '../screens/GymOwnerSide/ProfileSection/OwnerAccount/index.tsx';
import UpdateInformation from '../screens/GymOwnerSide/ProfileSection/OwnerAccount/PersonalInformation.tsx';
import UpdateGymInformation from '../screens/GymOwnerSide/ProfileSection/OwnerAccount/GymInformation.tsx';
import IdentityVerification from '../screens/GymOwnerSide/ProfileSection/OwnerAccount/IdentityVerification.tsx';
import MemberDetail from '../screens/GymOwnerSide/MemberDetail/index.tsx';
import MemberRequestDetail from '../screens/GymOwnerSide/MemberRequest/index.tsx';
import MemberList from '../screens/GymOwnerSide/Communities/MemberList.tsx';
import AddMember from '../screens/GymOwnerSide/AddMembers/index.tsx';
import MemberAddedSuccess from '../screens/GymOwnerSide/AddMembers/MemberAddedSuccess.tsx';
import ReviewRestriction from '../screens/GymOwnerSide/ReviewRestriction/index.tsx';
import EditRestriction from '../screens/GymOwnerSide/ReviewRestriction/EditRestriction.tsx';
import TrainingSchedule from '../screens/GymOwnerSide/TrainingSchedule/index.tsx';
import SchedulePlanDetail from '../screens/GymOwnerSide/TrainingSchedule/ScheduleDetail.tsx';
import ScheduleDetail from '../screens/GymOwnerSide/TrainingSchedule/Detail.tsx';
import AddSchedule from '../screens/GymOwnerSide/TrainingSchedule/AddSchedule.tsx';
import AddPlan from '../screens/GymOwnerSide/TrainingSchedule/AddPlan.tsx';
import SelectCoach from '../screens/GymOwnerSide/TrainingSchedule/SelectCoach.tsx';
import SelectMember from '../screens/GymOwnerSide/TrainingSchedule/SelectMember.tsx';
import Attendees from '../screens/GymOwnerSide/Attendees/index.tsx';
import GymChallengeDetail from '../screens/GymOwnerSide/CommunityDetail/index.tsx';
import Participants from '../screens/GymOwnerSide/CommunityDetail/Participants.tsx';
import GymLeaderBoad from '../screens/GymOwnerSide/LeaderBoad/index.tsx';
import Submission from '../screens/GymOwnerSide/LeaderBoad/Submission.tsx';
import AddChallenge from '../screens/GymOwnerSide/AddChallenges/index.tsx';
import EditChallenge from '../screens/GymOwnerSide/AddChallenges/EditChallenges.tsx';
import ChallengeCreated from '../screens/GymOwnerSide/AddChallenges/ChallengeCreated.tsx';
import Rules from '../screens/GymOwnerSide/AddRules/index.tsx';
import MyCoaches from '../screens/GymOwnerSide/MyCoach/index.tsx';
import AddCoaches from '../screens/GymOwnerSide/MyCoach/AddCoaches.tsx';
import CoachProfile from '../screens/GymOwnerSide/MyCoach/CoachProfile.tsx';
import ProfileCreated from '../screens/GymOwnerSide/MyCoach/ProfileCreated.tsx';
import AssignCoach from '../screens/GymOwnerSide/MyCoach/MemberAssign.tsx';
import SelectRole from '../screens/RoleSelection/SelectRole.tsx';
import CommunityGuide from '../screens/GymOwnerSide/CommunityGuide/index.tsx';
import Training from '../screens/AthleteSide/Training/index.tsx';
import TrainingAttendees from '../screens/AthleteSide/Training/TrainingAttendees.tsx';
import EditMember from '../screens/GymOwnerSide/AddMembers/EditMember.tsx';
import EditCoaches from '../screens/GymOwnerSide/MyCoach/EditCoache.tsx';
import AddCategory from '../screens/AthleteSide/AddCategory/index.tsx';
import CategoryAdded from '../screens/AthleteSide/AddCategory/CategoryAdded.tsx';
import ChallengeRules from '../screens/AthleteSide/ChallengesDetail/ChallengesRule.tsx';
import GymCommunity from '../screens/GymOwnerSide/Communities/index.tsx';
import CreateCommunity from '../screens/GymOwnerSide/MyCommunities/CreateCommunity/CreateCommunity.tsx';
import EditCommunity from '../screens/GymOwnerSide/MyCommunities/CreateCommunity/EditCommunity.tsx';
import CommunityCreated from '../screens/GymOwnerSide/MyCommunities/CommunityCreated.tsx';
import SearchMembers from '../screens/GymOwnerSide/SearchMember/index.tsx';
import Requests from '../screens/GymOwnerSide/SearchMember/Requests.tsx';
import AddedSuccess from '../screens/GymOwnerSide/SearchMember/AddedSuccess.tsx';
import SpeedChallenges from '../screens/Speed/SpeedChallenges.tsx';
import StrengthChallenges from '../screens/Strength/index.tsx';
import PowerChallenges from '../screens/Power/index.tsx';
import UpdateCoachPassword from '../screens/GymOwnerSide/MyCoach/UpdateCoachPassword.tsx';
import PiePiecesDetail from '../components/SkillTraining/PieDetail';
import SportInformation from '../components/SelectSports/SportInformation.tsx';
import {Platform} from 'react-native';
import {hp} from '../utils/responsivesness.ts';
import EditReviewScreen from '../screens/AddReview/EditReview.tsx';
import EditMatchType from '../screens/AddReview/EditMatchType.tsx';
import AddExercise from '../screens/AthleteSide/AddExercise/index.tsx';
interface StackNavigationProps {}

const Stack = createNativeStackNavigator();

const StackNavigation: React.FC<StackNavigationProps> = () => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: backgroundColor,
        paddingTop: Platform.OS == 'android' ? hp(3) : undefined,
      }}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SelectTheme" component={SelectTheme} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformation}
        />
        <Stack.Screen name="VerifySignUp" component={VerifySignup} />
        <Stack.Screen name="AcceptTerms" component={AcceptTerms} />
        <Stack.Screen
          name="AthleteBottomTab"
          component={AthleteTabNavigation}
        />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="CommunityDetail" component={CommunityDetail} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
        <Stack.Screen name="SelectRole" component={SelectRole} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LetsGoScreen" component={LetsGoScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotScreen} />
        <Stack.Screen name="OTPVerify" component={ForgotOtpScreen} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen
          name="ForgotSuccessScreen"
          component={ForgotSuccessScreen}
        />
        <Stack.Screen
          name="SelectSessionScreen"
          component={SelectSessionScreen}
        />
        <Stack.Screen name="AddReviewScreen" component={AddReviewScreen} />
        <Stack.Screen name="EditReviewScreen" component={EditReviewScreen} />
        <Stack.Screen name="EditMatchType" component={EditMatchType} />
        <Stack.Screen name="MatchReviewDetail" component={MatchReviewDetail} />
        <Stack.Screen
          name="RequestSubmittedScreen"
          component={RequestSubmittedScreen}
        />
        <Stack.Screen name="SubmittedMatch" component={SubmittedMatch} />
        <Stack.Screen name="MatchType" component={MatchType} />
        <Stack.Screen
          name="PhysicalPerformance"
          component={PhysicalPerformance}
        />
        <Stack.Screen
          name="PublicCommunityDetail"
          component={PublicCommunityDetail}
        />
        <Stack.Screen name="CommunityMember" component={CommunityMember} />
        <Stack.Screen name="CommunityChat" component={CommunityChat} />
        <Stack.Screen
          name="UploadPost"
          component={UploadPost}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            animationDuration: 300,
            headerShown: false,
          }}
        />
        <Stack.Screen name="SkillReviewDetail" component={SkillReviewDetail} />
        <Stack.Screen name="SuccessMembership" component={SuccessMembership} />
        <Stack.Screen name="AddSkills" component={AddSkill} />
        <Stack.Screen name="PerformanceSaved" component={PerformanceSaved} />
        <Stack.Screen
          name="AddReviewInformation"
          component={AddReviewInformation}
        />
        <Stack.Screen name="AthleteSettings" component={AthleteSettings} />
        <Stack.Screen name="ChangeTheme" component={ChangeTheme} />
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="TermsConditions" component={TermsConditions} />
        <Stack.Screen name="Membership" component={Membership} />
        <Stack.Screen name="MembershipPlan" component={MemberShipPlan} />
        <Stack.Screen name="BuyPlan" component={BuyPlan} />
        <Stack.Screen
          name="BuyMembershipSuccess"
          component={BuyMembershipSuccess}
        />
        <Stack.Screen name="UpdateAccount" component={UpdateAccount} />
        <Stack.Screen name="UnitPreference" component={UnitPreference} />
        <Stack.Screen name="ChangeUnits" component={ChangeUnits} />
        <Stack.Screen name="MyFriends" component={MyFriends} />
        <Stack.Screen name="Platforms" component={Platforms} />
        <Stack.Screen name="TrainingCalendars" component={TrainingCalendars} />
        <Stack.Screen name="AddTraining" component={AddTraining} />
        <Stack.Screen
          name="AddTrainingSubmission"
          component={AddTrainingSubmission}
        />
        <Stack.Screen name="TrainingDetail" component={TrainingDetail} />
        <Stack.Screen name="EditTraining" component={EditTraining} />
        <Stack.Screen
          name="UpdateTrainingDetail"
          component={UpdateTrainingDetail}
        />
        <Stack.Screen name="Endurance" component={Endurance} />
        <Stack.Screen name="RunningChallenges" component={RunningChallenges} />
        <Stack.Screen
          name="JoinedSuccessfully"
          component={JoinedSuccessfully}
        />
        <Stack.Screen name="InputChallenges" component={InputChallenges} />
        <Stack.Screen name="AttendenceGoal" component={AttendenceGoal} />
        <Stack.Screen name="AddGoal" component={AddGoals} />
        <Stack.Screen name="GoalAdded" component={GoalAdded} />
        <Stack.Screen name="Journals" component={Journals} />
        <Stack.Screen name="RequestFeedback" component={RequestFeedback} />
        <Stack.Screen
          name="ReceivedRequestDetail"
          component={ReceivedRequestDetail}
        />
        <Stack.Screen name="SendRequestDetail" component={SendRequestDetail} />
        <Stack.Screen name="ChallengeDetail" component={ChallengeDetail} />
        <Stack.Screen
          name="SuccessfullyParticipated"
          component={SuccessfullyParticipated}
        />
        <Stack.Screen name="MyChallenges" component={MyChallenges} />
        <Stack.Screen name="MyChallengeDetail" component={MyChallengeDetail} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
        <Stack.Screen name="ChallengeTraining" component={ChallengeTraining} />
        <Stack.Screen
          name="ChallengeSubmitted"
          component={ChallengeSubmitted}
        />
        <Stack.Screen name="VideoGuidelines" component={VideoGuidelines} />
        <Stack.Screen name="Badges" component={Badges} />
        <Stack.Screen name="GymOwnerSignUp" component={GymOwnerSignUp} />
        <Stack.Screen name="GymInformation" component={GymInformation} />
        <Stack.Screen name="VerifyBusiness" component={VerifyBusiness} />
        <Stack.Screen name="AcceptConditions" component={AcceptConditions} />
        <Stack.Screen name="ReviewingProfile" component={ReviewingProfile} />
        <Stack.Screen name="OwnerBottomTab" component={OwnerTabNavigation} />
        <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
        <Stack.Screen name="OwnerSettings" component={OwnerSettings} />
        <Stack.Screen name="OwnerAccount" component={OwnerAccount} />
        <Stack.Screen name="AddExercise" component={AddExercise} />
        <Stack.Screen name="UpdateInformation" component={UpdateInformation} />
        <Stack.Screen
          name="UpdateGymInformation"
          component={UpdateGymInformation}
        />
        <Stack.Screen
          name="IdentityVerification"
          component={IdentityVerification}
        />
        <Stack.Screen name="MemberDetail" component={MemberDetail} />
        <Stack.Screen
          name="MemberRequestDetail"
          component={MemberRequestDetail}
        />
        <Stack.Screen name="MemberList" component={MemberList} />
        <Stack.Screen name="AddMember" component={AddMember} />
        <Stack.Screen
          name="MemberAddedSuccess"
          component={MemberAddedSuccess}
        />
        <Stack.Screen name="ReviewRestriction" component={ReviewRestriction} />
        <Stack.Screen name="EditRestriction" component={EditRestriction} />
        <Stack.Screen name="TrainingSchedule" component={TrainingSchedule} />
        <Stack.Screen
          name="SchedulePlanDetail"
          component={SchedulePlanDetail}
        />
        <Stack.Screen name="ScheduleDetail" component={ScheduleDetail} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} />
        <Stack.Screen name="AddPlan" component={AddPlan} />
        <Stack.Screen name="SelectCoach" component={SelectCoach} />
        <Stack.Screen name="SelectMember" component={SelectMember} />
        <Stack.Screen name="Attendees" component={Attendees} />
        <Stack.Screen
          name="GymChallengeDetail"
          component={GymChallengeDetail}
        />
        <Stack.Screen name="Participants" component={Participants} />
        <Stack.Screen name="GymLeaderBoad" component={GymLeaderBoad} />
        <Stack.Screen name="Submission" component={Submission} />
        <Stack.Screen name="AddChallenge" component={AddChallenge} />
        <Stack.Screen name="EditChallenge" component={EditChallenge} />
        <Stack.Screen name="ChallengeCreated" component={ChallengeCreated} />
        <Stack.Screen name="Rules" component={Rules} />
        <Stack.Screen name="MyCoaches" component={MyCoaches} />
        <Stack.Screen name="AddCoaches" component={AddCoaches} />
        <Stack.Screen name="CoachProfile" component={CoachProfile} />
        <Stack.Screen name="ProfileCreated" component={ProfileCreated} />
        <Stack.Screen name="AssignCoach" component={AssignCoach} />
        <Stack.Screen name="CommunityGuide" component={CommunityGuide} />
        <Stack.Screen name="Training" component={Training} />
        <Stack.Screen name="TrainingAttendees" component={TrainingAttendees} />
        <Stack.Screen name="EditMember" component={EditMember} />
        <Stack.Screen name="EditCoache" component={EditCoaches} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
        <Stack.Screen name="CategoryAdded" component={CategoryAdded} />
        <Stack.Screen name="ChallengeRules" component={ChallengeRules} />
        <Stack.Screen name="GymCommunity" component={GymCommunity} />
        <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
        <Stack.Screen name="EditCommunity" component={EditCommunity} />
        <Stack.Screen name="CommunityCreated" component={CommunityCreated} />
        <Stack.Screen name="SearchMember" component={SearchMembers} />
        <Stack.Screen name="Requests" component={Requests} />
        <Stack.Screen name="AddedSuccess" component={AddedSuccess} />
        <Stack.Screen name="SpeedChallenges" component={SpeedChallenges} />
        <Stack.Screen
          name="StrengthChallenges"
          component={StrengthChallenges}
        />
        <Stack.Screen name="PowerChallenges" component={PowerChallenges} />
        <Stack.Screen
          name="UpdateCoachPassword"
          component={UpdateCoachPassword}
        />
        <Stack.Screen name="PieDetail" component={PiePiecesDetail} />
        <Stack.Screen name="SportInformation" component={SportInformation} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default StackNavigation;
