import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { FlatList } from 'react-native';
import DatePicker from 'react-native-datepicker';

export const StatisticScreen = ({
  deliveries,
  userID,
  kitchen,
  getDeliveries,
}) => {
  const [dateFrom, setDateFrom] = useState(moment().format('YYYY-MM-DD'));
  const [dateTo, setDateTo] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    getDeliveries(dateFrom, dateTo, kitchen, userID);
  }, [dateFrom, dateTo]);

  const renderDeliveryItem = ({ item }) => {
    return (
      <Item>
        <Row>
          <AccentWrapper>
            <AccentText>№{item.id}</AccentText>
          </AccentWrapper>
          <AccentWrapper>
            <AccentText>
              {Math.floor(
                (((item.delivery_distance + item.return_distance) * 1.2) /
                  1000) *
                  100
              ) / 100}{' '}
              км.
            </AccentText>
          </AccentWrapper>
        </Row>

        {item.orders.map((item, index) => {
          return (
            <OrderRow key={index}>
              <StyledText>
                Дата: {moment(item.updated_at).format('HH:mm DD.MM.YY')}
              </StyledText>

              <StyledText>Ресторан: {item.restaurant}</StyledText>
              <StyledText>Адреса: {item.address}</StyledText>
            </OrderRow>
          );
        })}
      </Item>
    );
  };

  return (
    <Wrapper>
      <DateTitle>Оберіть проміжок дат</DateTitle>
      <DateRow>
        <DatePicker
          style={{ width: 150 }}
          date={dateFrom}
          mode="date"
          placeholder="Обрати дату"
          format="YYYY-MM-DD"
          minDate="2021-10-01"
          maxDate="2030-12-31"
          confirmBtnText="Застосувати"
          cancelBtnText="Скасувати"
          onDateChange={(date) => setDateFrom(date)}
        />
        <DatePicker
          style={{ width: 150 }}
          date={dateTo}
          mode="date"
          placeholder="Обрати дату"
          format="YYYY-MM-DD"
          minDate="2021-10-01"
          maxDate="2030-12-31"
          confirmBtnText="Застосувати"
          cancelBtnText="Скасувати"
          onDateChange={(date) => setDateTo(date)}
        />
      </DateRow>

      {deliveries && (
        <FlatList data={deliveries} renderItem={renderDeliveryItem} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  padding: 5px;
`;

const DateRow = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  padding: 0 10px;
`;

const DateTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  padding: 0 10px;
  margin-bottom: 10px;
`;

const Item = styled.View`
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 3px #eaeaea;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-top: 5px;
`;

const AccentWrapper = styled.View`
  padding: 5px;
  background-color: #eda240;
  border-radius: 5px;
`;

const AccentText = styled.Text`
  color: #fff;
  font-weight: 500;
`;

const OrderRow = styled.View`
  /* margin-top: 10px; */
  padding-bottom: 5px;
  border-top-width: 2px;
  border-top-color: #eaeaea;
  /* &:last-child {
    border-bottom-color: transparent;
  } */
`;
