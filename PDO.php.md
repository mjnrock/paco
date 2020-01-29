# PDO Tutorial
https://phpdelusions.net/pdo#why

## Param Bindings
```
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? AND status=?');
$stmt->execute([$email, $status]);
$user = $stmt->fetch();
// or
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email AND status=:status');
$stmt->execute(['email' => $email, 'status' => $status]);
$user = $stmt->fetch();
```

### `bindParam`
```
$stmt = $pdo->prepare('SELECT * FROM table LIMIT ?, ?');
$stmt->bindParam(1, $offset,PDO::PARAM_INT);
$stmt->bindParam(2, $limit,PDO::PARAM_INT);
$stmt->execute();
$data = $stmt->fetchAll();
```

## Fetch Flags
```
PDO::FETCH_NUM returns enumerated array
PDO::FETCH_ASSOC returns associative array
PDO::FETCH_BOTH - both of the above
PDO::FETCH_OBJ returns object
PDO::FETCH_LAZY allows all three (numeric associative and object) methods without memory overhead.

$news = $pdo->query('SELECT * FROM news')->fetchAll(PDO::FETCH_CLASS, 'News');
```

## Transactions
To successfully run a transaction, you have to make sure that error mode is set to exceptions, and learn three canonical methods:

1) `beginTransaction()` to start a transaction
2) `commit()` to commit one
3) `rollback()` to cancel all the changes you made since transaction start.

```
    try {
    $pdo->beginTransaction();
    $stmt = $pdo->prepare("INSERT INTO users (name) VALUES (?)");
    foreach (['Joe','Ben'] as $name)
    {
        $stmt->execute([$name]);
    }
    $pdo->commit();
} catch (Exception $e){
    $pdo->rollback();
    throw $e;
}
```

## Stored Procedures
This is specifically to solve the cases where a stored procedure returns multiple result sets
```
$stmt = $pdo->prepare("CALL foo()");
$stmt->execute();
do {
    $data = $stmt->fetchAll();
    var_dump($data);
} while ($stmt->nextRowset() && $stmt->columnCount());
```

### Handling Return Variables for `IN`, `INOUT`, or `OUT`
https://stackoverflow.com/questions/23747835/mysql-retrieve-variable-from-stored-procedure-in-php-pdo/23749445#23749445

