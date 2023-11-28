import { connect } from 'react-redux';
import { StatisticScreen } from './StatisticScreen';
import { withTranslation } from 'react-i18next';

import { getDeliveries } from '../../../store/actions/statistics';

const mapStateToProps = (state) => ({
  deliveries: state.statistics.deliveries.data,
  userID: state.user.user.data.id,
  kitchen: state.user.user.data.kitchen_code,
});

const mapDispatchToProps = (dispatch) => ({
  getDeliveries: (from, to, kitchen, userID) =>
    dispatch(getDeliveries(from, to, kitchen, userID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(StatisticScreen));
