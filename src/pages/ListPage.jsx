import Header from "../components/Header/Header";
import MonthsList from "../components/MonthList/MonthsList";
import MyCredit from "../components/MyCredit/MyCredit";
import SponsorshipList from "../components/SponsorshipList/SponsorshipList";

function ListPage() {
  return (
    <div>
      <Header />
      <div>리스트 페이지</div>
      <MyCredit />
      <SponsorshipList />
      <MonthsList />
    </div>
  );
}

export default ListPage;
