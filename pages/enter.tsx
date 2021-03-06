import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useContext, useState, useCallback, useEffect } from 'react';
import { UserContext } from '../lib/context';
import debounce from 'lodash.debounce';

const Enter = (props) => {
  const { user, username } = useContext(UserContext);

  //Sign in with google button
  const SignInButton = () => {
    const signInWithGoogle = async () => {
      await auth.signInWithPopup(googleAuthProvider);
    };

    return (
      <button className='btn-google' onClick={signInWithGoogle}>
        <img src={'/google.png'} alt='Google' />
        Sign in with Google
      </button>
    );
  };

  //Sign ou button
  const SignOutButton = () => {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
  };

  // User form
  const UsernameForm = () => {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onSubmit = async (e) => {
      e.preventDefault();

      //Create refs for both documents in database
      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValue}`);

      // Commit both docs together as a batch write.
      const batch = firestore.batch();
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    };

    const onChange = (e) => {
      // force form value typed in form to match correct format
      // Force form value typed in form to match correct format
      const val = e.target.value.toLowerCase();
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

      // Only set form value if length is < 3 OR it passes regex
      if (val.length < 3) {
        setFormValue(val);
        setLoading(false);
        setIsValid(false);
      }

      if (re.test(val)) {
        setFormValue(val);
        setLoading(true);
        setIsValid(false);
      }
    };

    useEffect(() => {
      checkUsername(formValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValue]);

    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useCallback(
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          console.log('Firestore read executed!');
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
      []
    );

    return (
      !username && (
        <section>
          <h3>Choose Username</h3>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              name='username'
              placeholder='username'
              value={formValue}
              onChange={onChange}
            />
            <button type='submit' className='btn-green' disabled={!isValid}>
              Choose
            </button>

            <h3>Debug state</h3>
            <div>
              Username: {formValue}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div>
          </form>
        </section>
      )
    );
  };

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

export default Enter;
