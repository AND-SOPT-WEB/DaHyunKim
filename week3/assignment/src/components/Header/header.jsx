import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.black};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.06rem;
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.Aftika};
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.1rem;
  padding: 0.2rem;
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 15rem;
`;

const MenuItem = styled.div`
  margin-right: 0.5rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  border-radius: 14.5rem;
  font-size: 0.9rem;
  color: ${(props) => (props.selected ? props.theme.colors.black : props.theme.colors.white)};
  background-color: ${(props) => (props.selected ? props.theme.colors.white : 'transparent')};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:last-child {
    margin-right: 0;
  }
`;

const LevelSelect = styled.select`
  padding: 0.5rem;
  border-radius: 0.4rem;
`;

const Timer = styled.div`
  color: ${(props) => props.theme.colors.white};
`;

const Header = ({ selectedMenu, setSelectedMenu, time, isGameStarted = false }) => {
    return (
      <HeaderContainer>
        <LeftSection>
          <Logo>1 to 50</Logo>
          <MenuContainer>
            <MenuItem selected={selectedMenu === "게임"} onClick={() => setSelectedMenu("게임")}>
              게임
            </MenuItem>
            <MenuItem selected={selectedMenu === "랭킹"} onClick={() => setSelectedMenu("랭킹")}>
              랭킹
            </MenuItem>
          </MenuContainer>
        </LeftSection>
        {selectedMenu === "게임" && (
          <RightSection>
            <LevelSelect>
              <option>Level 1</option>
              <option>Level 2</option>
              <option>Level 3</option>
            </LevelSelect>
            <Timer>{isGameStarted ? time.toFixed(2) : "0"}</Timer> 
          </RightSection>
        )}
      </HeaderContainer>
    );
  };
  
Header.propTypes = {
  selectedMenu: PropTypes.string.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,  
  isGameStarted: PropTypes.bool.isRequired,    
};

export default Header;
