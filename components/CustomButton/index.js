import React from 'react';
import { Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';

function CustomButton({ title, onPress, color }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: color, borderRadius: 5, height: 40, alignItems: 'center', justifyContent: 'center', width: '100%'
      }}
      android_ripple={{ color: '#b3d1ff' }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>{`${title}`}</Text>
    </Pressable>
  );
}

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string
};

CustomButton.defaultProps = {
  color: '#4d94ff',
};

export default CustomButton;
