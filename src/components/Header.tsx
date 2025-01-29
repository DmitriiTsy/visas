import styled from "@emotion/styled";

const HeaderContainer = styled.header`
  height: 700px;
  width: 100%;
  background-color: #ffd700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 500px;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    height: 400px;
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: black;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeaderText = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  color: black;
  text-align: center;
  line-height: 1.2;
  max-width: 900px;
  font-family: var(--font-geist-sans);

  @media (max-width: 1024px) {
    font-size: 3.5rem;
    max-width: 700px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    max-width: 100%;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>ALMA</Logo>
      <HeaderText>
        Get an Assessment
        <br />
        Of Your Immigration Case
      </HeaderText>
    </HeaderContainer>
  );
};

export default Header;
