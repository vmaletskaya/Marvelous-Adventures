const ErrorToast = () => {
  return (
    <div style={styles.toastFlex}>
      <p style={styles.toastText}>Something went wrong</p>
     
    </div>
  );
}; 

export default ErrorToast;

const styles = {
  toastFlex: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  toastText: {
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  toastImg: { width: '60px' },
};